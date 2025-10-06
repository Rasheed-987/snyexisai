import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  return NextResponse.json({ 
    success: true, 
    message: `Auth route for ID: ${id}` 
  })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  
  return NextResponse.json({ 
    success: true, 
    message: `Updated auth for ID: ${id}`,
    data: body
  })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  
  return NextResponse.json({ 
    success: true, 
    message: `Deleted auth for ID: ${id}` 
  })
}