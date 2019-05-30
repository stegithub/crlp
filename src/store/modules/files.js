import { GET_LIST } from '../getter-types'

export const MODULE_NAME = 'FILES'
export const COLLECTION_NAME = 'media'
export const PROP_NAME = 'data'

export default {
	firestorePath: `${COLLECTION_NAME}`,
	firestoreRefType: 'collection',
	moduleName: MODULE_NAME,
	statePropName: PROP_NAME,
    namespaced: true,
	getters: {
		[GET_LIST]: state => {
            if(state[PROP_NAME])
                return Object.values(state[PROP_NAME])
		}
	}
}
