import type { TemplateJobProps } from './main.server'

export const jobs: any = {
    templateJob: {
        perform: async ({}: TemplateJobProps) => {
            return {}
        },
    },
}
