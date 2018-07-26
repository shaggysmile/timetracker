// If it's a private page and there's no payload, redirect.
export default function (context) {
  const { store, redirect } = context
  const { auth } = store.state
  if (auth.user) {
    return redirect('/dashboard')
  }
}
