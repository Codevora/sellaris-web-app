import { NextResponse } from 'next/server';
import { getSubscriptionById } from '@/lib/subscriptions';

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await getSubscriptionById(params.id);
    
    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}