export default ({ env }) => {
  const hasAWSCredentials =
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;

  if (hasAWSCredentials) {
    return {
      upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            s3Options: {
              credentials: {
                accessKeyId: env('AWS_ACCESS_KEY_ID'),
                secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
              },
              region: 'auto',
              endpoint: env('CF_R2_ENDPOINT'),
              forcePathStyle: true,
            },
            params: {
              Bucket: env('CF_BUCKET_NAME'),
            },
            baseUrl: env(
              'R2_DEV_DOMAIN',
              'https://pub-da902343a39f42e2b8a99078b67aa4b4.r2.dev',
            ),
          },
        },
      },
    };
  }

  return {
    upload: {
      config: {
        provider: 'local',
      },
    },
  };
};
