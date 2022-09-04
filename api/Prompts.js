export const PACKAGE_TYPE_NONE = 0x0000
export const PACKAGE_TYPE_GITHUB_SUBMODULE = 0x0001
export const PACKAGE_TYPE_SINGLE_FILE = 0x0002
export const PACKAGE_TYPE_PROJECT = 0x0003
export const PACKAGE_TYPES = {
	'GitHub SubModule': PACKAGE_TYPE_GITHUB_SUBMODULE,
	'Single File': PACKAGE_TYPE_SINGLE_FILE,
	'Sub Project': PACKAGE_TYPE_PROJECT
}

export const LIBRARY_TYPE_NONE = 0x0010
export const LIBRARY_TYPE_HEADER_ONLY = 0x0011
export const LIBRARY_TYPE_STATIC = 0x0012
export const LIBRARY_TYPE_DYNAMIC = 0x0013
export const LIBRARY_TYPES = {
	'Header Only': LIBRARY_TYPE_HEADER_ONLY,
	'Static Library': LIBRARY_TYPE_STATIC,
	'Dynamic Library': LIBRARY_TYPE_DYNAMIC
}

export const PROJECT_TYPE_NONE = 0x0020
export const PROJECT_TYPE_CONSOLE_APP = 0x0021
export const PROJECT_TYPE_STATIC_LIB = 0x0022
export const PROJECT_TYPE_DYNAMIC_LIB = 0x0023
export const PROJECT_TYPES = {
	'Console App': PROJECT_TYPE_CONSOLE_APP,
	'Static Lib': PROJECT_TYPE_STATIC_LIB,
	//'Dynamic Lib': PROJECT_TYPE_DYNAMIC_LIB --- Currently Unsupported
}

export const LANGUAGE_NONE = 0x0030
export const LANGUAGE_CPP = 0x0031
export const LANGUAGE_C = 0x0032
export const LANGUAGES = {
	'C': LANGUAGE_C,
	'C++': LANGUAGE_CPP
}

export const PROMPT_BOOL = {
	'Yes': true,
	'No': false
}
