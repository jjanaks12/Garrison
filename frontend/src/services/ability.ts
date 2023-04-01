import { Ability } from '@casl/ability'

const ability = new Ability([{
    subject: 'all',
    action: ['read']
}])

export default ability