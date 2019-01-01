import { GraphQLModule } from '@graphql-modules/core';
import { ContainerModuleConfig } from '..';

export default ({ config }: GraphQLModule<ContainerModuleConfig>) => ({
  Mutation: {
    create: (root: never, { options }) =>
      config.docker.container.create({
        Image: options.image,
        name: options.name,
        Cmd: options.cmd,
      }),
    start: (root: never, { id }) => config.docker.container.get(id).start(),
    restart: (root: never, { id }) => config.docker.container.get(id).restart(),
    stop: (root: never, { id }) => config.docker.container.get(id).stop(),
    delete: async (root: never, { id, force }) => {
      await config.docker.container.get(id).delete({ force: !!force });

      return true;
    },
  },
});
