import { getInstance } from "./";

describe("http-client", () => {
  describe("getFactory", () => {
    it("should return a non null instance", () => {
      const httpClient = getInstance();
      expect(httpClient).not.toBeNull();
    });    
  });  
});