import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!

export interface UploadResult {
  key: string
  url: string
  bucket: string
}

export interface PresignedUploadResult {
  uploadUrl: string
  key: string
  fileUrl: string
  fields?: Record<string, string>
}

export class S3Service {
  /**
   * Generate a presigned URL for client-side file upload
   */
  static async getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600
  ): Promise<PresignedUploadResult> {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType,
      })

      const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn })
      const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

      return {
        uploadUrl,
        key,
        fileUrl,
      }
    } catch (error) {
      console.error('Error generating presigned upload URL:', error)
      throw new Error('Failed to generate presigned upload URL')
    }
  }

  /**

  /**
   * Delete a file from S3
   */
  static async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      await s3Client.send(command)
    } catch (error) {
      console.error('Error deleting file from S3:', error)
      throw new Error('Failed to delete file from S3')
    }
  }

  /**
   * Get a presigned URL for file download
   */
  static async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })

      const url = await getSignedUrl(s3Client, command, { expiresIn })
      return url
    } catch (error) {
      console.error('Error generating presigned URL:', error)
      throw new Error('Failed to generate presigned URL')
    }
  }

  /**
   * Generate a unique key for file storage
   */
  static generateKey(filename: string, folder: string = ''): string {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = filename.split('.').pop()
    const baseName = filename.split('.').slice(0, -1).join('.')
    
    const key = folder 
      ? `${folder}/${timestamp}-${randomString}-${baseName}.${extension}`
      : `${timestamp}-${randomString}-${baseName}.${extension}`
    
    return key
  }

  /**
   * Upload a file directly to S3 using presigned URL
   * Reusable function for banner and gallery images
   */
  static async uploadFileToS3(
    file: File,
    folder: string,
    subfolder?: string
  ): Promise<string> {
    try {
      // Generate unique key for the file
      const fullFolder = subfolder ? `${folder}/${subfolder}` : folder
      const key = this.generateKey(file.name, fullFolder)
      
      // Get presigned upload URL
      const presignedUpload = await this.getPresignedUploadUrl(key, file.type)
      
      // Upload file to S3 using fetch
      const uploadResponse = await fetch(presignedUpload.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })
      
      console.log(`🔍 Upload response for ${file.name}:`, uploadResponse.status)
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('❌ S3 Upload failed:', {
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          error: errorText,
          fileName: file.name,
        })
        throw new Error(`Failed to upload ${file.name}: ${uploadResponse.status} ${uploadResponse.statusText}`)
      }
      
      console.log(`✅ File uploaded successfully: ${presignedUpload.fileUrl}`)
      
      // Return the public S3 URL
      return presignedUpload.fileUrl
      
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw error
    }
  }

  /**
   * Upload multiple files (banner + gallery images) to S3
   * Returns structured object with banner and gallery URLs
   */
  static async uploadImages(
    bannerFile: File | null,
    galleryFiles: File[],
    sectionName: string,
    uniqueId: string
  ): Promise<{ banner?: string; gallery: string[] }> {
    const uploadedImages: { banner?: string; gallery: string[] } = { gallery: [] }
    
    try {
      // Upload banner image if exists
      if (bannerFile && bannerFile.size > 0) {
        const bannerUrl = await this.uploadFileToS3(
          bannerFile,
          `${sectionName}/${uniqueId}`
        )
        uploadedImages.banner = bannerUrl
      }
      
      // Upload gallery images if any
      for (const file of galleryFiles) {
        if (file && file.size > 0) {
          const galleryUrl = await this.uploadFileToS3(
            file,
            `${sectionName}/${uniqueId}`,
            'gallery'
          )
          uploadedImages.gallery.push(galleryUrl)
        }
      }
      
      return uploadedImages
      
    } catch (error) {
      console.error('Error uploading images:', error)
      throw error
    }
  }
}

export default s3Client