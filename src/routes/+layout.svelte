<script>
  import '../app.postcss';

  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

  import Footer from '$/components/Footer.svelte';
  import NavBar from '$/components/NavBar.svelte';

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <NavBar
    menus={[
      { text: 'Home', href: '/' },
      { text: 'Prambors ↗', href: 'https://pramborsfm.com' },
      { text: 'GitHub ↗', href: 'https://github.com/masnormen/prambors' }
    ]}
  />
  <slot />
  <Footer />
</QueryClientProvider>
