export type MessageToParentEventType = 'readyToReceiveSignedParameters'

export type MessageToParent = {
  event: MessageToParentEventType
}

export function postMessageToParent(event: MessageToParentEventType, parentOrigin: string) {
  if (window.parent === window) return

  window.parent.postMessage({ event }, parentOrigin)
}
