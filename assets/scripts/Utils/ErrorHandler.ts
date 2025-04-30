export class ErrorHandler {
    static handleError(action: () => void, onError: () => void): void {
      try {
        action();
      } catch (error) {
        console.error('Error occurred:', error);
        onError();
      }
    }
  }