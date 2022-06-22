import path from "path"

export const server = process.env.SERVER_BASE_URL

export const supportSiteLink ="https://support.rewave.ch"

export const ASSETS_DIR_NAME = process.env.STORAGE_ASSETS_DIR_NAME
export const ASSETS_TMP_DIR = path.resolve(`./.temp/${ASSETS_DIR_NAME}/`)
export const TMP_DIR =  path.resolve("./.temp/")