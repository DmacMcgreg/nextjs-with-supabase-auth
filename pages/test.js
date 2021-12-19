import Link from 'next/link'
import { Card, Typography, Space } from '@supabase/ui'
import { supabase } from '../utils/initSupabase'

export default function Profile({ data }) {
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>Instructions Page</Typography.Text>
          <Typography.Text type="success">
            This is a page that can be seen with a unique code. Without the code, this page cannot be visited without a code
          </Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Typography.Text>

        </Space>
      </Card>
    </div>
  )
}

export async function getServerSideProps({ req, query }) {
  const REST_URL = 'http://localhost:3000'
  // const postgrest = new PostgrestClient(REST_URL, { fetch: fetch })

  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('code', query?.id)

  console.log(query)


  //const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!data) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { data } }
}
