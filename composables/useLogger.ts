export const useLogger = (id: string) => {
  // TODO: improve another methods from console or use some lib.
  return {
    log(...msg: any) {
      console.log(`[${id}]`, ...msg)
    }
  }
}