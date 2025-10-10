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
}

export default s3Client