import connect from "@/utils/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const res = await request.json();
  const { name, email, password } = res;

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  })

  try {
    await newUser.save();
    return new NextResponse("L'utilisateur a été créé", {
      status: 201,
    })
  }catch(err) {
    return new NextResponse(err.message, {
      status: 500,
    })
  }
}