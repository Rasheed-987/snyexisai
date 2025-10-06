import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  return NextResponse.json({ 
    success: true, 
    message: `Career post ${id} retrieved successfully` 
  })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  
  return NextResponse.json({ 
    success: true, 
    message: `Career post ${id} updated successfully`,
    data: body
  })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  return NextResponse.json({ 
    success: true, 
    message: `Career post ${id} deleted successfully` 
  })
}