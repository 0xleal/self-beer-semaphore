import { NextResponse } from 'next/server';

// Simple in-memory state (will reset on server restart)
// In production, you might want to use a database or file storage
let beerMachineStatus: 'open' | 'closed' = 'closed';

export async function GET() {
  return NextResponse.json({
    status: beerMachineStatus,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status } = body;

    if (status !== 'open' && status !== 'closed') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "open" or "closed"' },
        { status: 400 }
      );
    }

    beerMachineStatus = status;

    return NextResponse.json({
      status: beerMachineStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
