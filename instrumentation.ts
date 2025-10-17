export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('='.repeat(60));
    console.log('INSTRUMENTATION: Application Starting');
    console.log('='.repeat(60));
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Node Environment: ${process.env.NODE_ENV}`);
    console.log(`Database URL: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
    console.log('='.repeat(60));

    const originalFetch = global.fetch;
    global.fetch = async (...args) => {
      const startTime = Date.now();
      const url = typeof args[0] === 'string' ? args[0] : args[0]?.toString();

      try {
        const response = await originalFetch(...args);
        const duration = Date.now() - startTime;

        console.log(`[FETCH] ${url} - Status: ${response.status} - Duration: ${duration}ms`);

        return response;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[FETCH ERROR] ${url} - Duration: ${duration}ms - Error: ${error}`);
        throw error;
      }
    };

    console.log('[INSTRUMENTATION] Global fetch monitoring enabled');
  }
}
