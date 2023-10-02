import connect from "@/utils/db"
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {

  const {id} = params;

  try {
    await connect();

    const post = await Post.findById(id);
    // console.log(post)

    return new NextResponse(JSON.stringify(post), {status: 200})

  } catch(err) {
    return new NextResponse("Erreur d'accès à la base de données", {status: 500})
  }
}

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("L'article a été supprimé", { status: 200 });
  } catch (err) {
    return new NextResponse("Erreur d'accès à la base de données", { status: 500 });
  }
};