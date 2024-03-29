import Link from 'next/link'
import { Card, Typography, Space } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'

export default function Profile({ user }) {
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>You're signed in</Typography.Text>
          <Typography.Text strong>Email: {user.email}</Typography.Text>
          <Typography.Text type="success">
            User data retrieved server-side (from Cookie in getServerSideProps):
          </Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Typography.Text>

          <Typography.Text>
            <Link href="/">
              <a>Static example with useSWR</a>
            </Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const REST_URL = 'http://localhost:3000'
  // const postgrest = new PostgrestClient(REST_URL, { fetch: fetch })

  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('code', '59485e2d-2bf5-4720-9832-46e0e6e8a27c')

  console.log(data)


  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
