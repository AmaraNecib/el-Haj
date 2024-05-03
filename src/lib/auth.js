import { SignJWT, jwtVerify } from "jose";

const secretKey = "EL-Haj-2024-2025";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15d")
    .sign(key);
}

export async function login(userId) {
    // Verify credentials && get the user
  
    const user = { userId: userId};
  
    // Create the session
    const expires = new Date(Date.now()  + (1000 * 60 * 60 * 24 * 15));
    const session = await encrypt({ user, expires });
  
    return session
  }

export async function decrypt(input){
  try{
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }catch(error){
    return null
  }
}

export async function getUserId(token) {
  const payload = await decrypt(token);
  return payload.user.userId;
}

export const validToken = async (token) => {
  const ts = await decrypt(token);
  // console.log('token: ',ts)
  if(!ts?.expires) return false;
  if(ts?.expires <= new Date(Date.now()))
    return false;
  return true;   
}