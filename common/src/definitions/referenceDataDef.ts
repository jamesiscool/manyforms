export interface ReferenceDataDef {
	inline?: {
		[name: string]: any
	}
	http?: {
		name: string,
		url: string,
		method?: 'get' | 'GET' | 'post' | 'POST',
		baseURL?: string
	}[]
}