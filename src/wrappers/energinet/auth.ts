import token from '../energinet/routes/token'

let accessToken = ''

export async function getAccessToken(): Promise<string> {
  if (!accessToken) {
    const fetched = await token.getToken().catch((err) => {
      throw err
    })
    accessToken = fetched.result
  }
  return accessToken
}
