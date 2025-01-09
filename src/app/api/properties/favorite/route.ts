import { NextResponse } from "next/server";
import { favoriteProperty, getFavorites } from "../../../../../lib/actions";

export async function GET() {
  try {
    const favorites = await getFavorites();
    return NextResponse.json(favorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const updatedFavorites = await favoriteProperty(id);
    return NextResponse.json(updatedFavorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
