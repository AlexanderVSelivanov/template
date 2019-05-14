class ApplicationError extends Error {
  constructor(error?: Error | string) {
    if (error) {
      if (typeof error === 'string') {
        super(error);
      } else {
        super();
        this.name = error.name;
        this.message = error.message;
        this.stack = error.stack;
      }
    } else {
      super();
    }
  }
}

export default ApplicationError;
