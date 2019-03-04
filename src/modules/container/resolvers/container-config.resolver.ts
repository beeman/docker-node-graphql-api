import { GraphQLModule } from '@graphql-modules/core';
import { ContainerModuleConfig } from '..';

export default ({ config }: GraphQLModule<ContainerModuleConfig>) => ({
  ContainerConfig: {
    hostname: c => c.Hostname,
    domainName: c => c.Domainname,
    user: c => c.User,
    exposedPorts: c => (c.ExposedPorts ? Object.keys(c.ExposedPorts) : []),
    environmentVariables: c =>
      (c.Env || []).map(env => {
        const split = env.split('=');

        return {
          name: split[0],
          value: split[1],
        };
      }),
    labels: c =>
      Object.keys(c.Labels).map(name => ({
        name,
        value: c.Labels[name],
      })),
    image: async c => await config.docker.image.get(c.Image),
    workingDir: c => c.WorkingDir,
    entrypoint: c => Array.isArray(c.Entrypoint) ? c.Entrypoint : [c.Entrypoint],
  },
});
