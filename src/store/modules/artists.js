import { GET_LIST } from '../getter-types'

export const MODULE_NAME = 'ARTISTS'
export const COLLECTION_NAME = 'artists'
export const PROP_NAME = 'data'

export default {
	firestorePath: `${COLLECTION_NAME}`,
	firestoreRefType: 'collection',
	moduleName: MODULE_NAME,
	statePropName: PROP_NAME,
    namespaced: true,
    sync: {
        where: [
            ['users', 'array-contains', '{userId}']
        ]
    },
	getters: {
		[GET_LIST]: state => {
			return state[PROP_NAME]
		}
	}
}
