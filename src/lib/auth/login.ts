import fetch, { Headers } from 'node-fetch'

export const login = async (email: string, password: string) => {
  const response = await fetch(`https://genius.com/api/sessions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        login: email,
        password,
      },
    }),
  }).catch(e => {
    console.log(e)
    throw 'Login failed'
  })
  if (response.status !== 200) {
    throw 'Login failed'
  }

  const cookies = response.headers.raw()['set-cookie']

  const sessionCookie = cookies.filter((cookie: string) =>
    cookie.startsWith('_rapgenius_session='),
  )

  if (sessionCookie !== undefined && sessionCookie.length > 0) {
    return sessionCookie[0].split(';')[0].split('=')[1]
  }

  return undefined
}
