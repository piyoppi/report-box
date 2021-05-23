import { ReportClient } from './report-client'

export function iframeGetMessageHandler (parentOrigin: string, client: ReportClient, e: MessageEvent<string>) {
  if (parentOrigin !== e.origin) throw new Error('Invalid origin')

  client.report.setSignedParameters(e.data)
}
