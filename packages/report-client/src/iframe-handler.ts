import { ReportClient } from './report-client'
import { iframeGetMessageHandler } from './iframe-get-message-handler'
import { postMessageToParent } from './message-to-parent'

export function registerGetMessageHandler(parentOrigin: string, client: ReportClient) {
  window.addEventListener('message', e => iframeGetMessageHandler(parentOrigin, client, e), false)
  postMessageToParent('readyToReceiveSignedParameters', parentOrigin)
}
