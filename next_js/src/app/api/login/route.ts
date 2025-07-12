import { NextResponse } from 'next/server';

// Define the POST handler for the login route
export async function POST(request: Request) {
  const { email, password } = await request.json(); // Extract email and password from the request body

  // Validate input
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 422 });
  }

  try {
    // Call the FastAPI backend for authentication
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ error: data.detail || 'Invalid email or password' }, { status: response.status });
    }
  } catch (error) {
    console.error('Authentication error:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
