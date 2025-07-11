import { isBtnActive } from "./main-header.utils";

// Helper method to mock window.location
const mockLocation = (hostname, protocol, pathname) => {
  const location = {
    hostname,
    protocol,
    pathname
  };
  
  Object.defineProperty(window, 'location', {
    value: location,
    writable: true,
    configurable: true
  });
};

describe("Main header btns underline", () => {
  beforeEach(() => {
    // Clean mocks before each test
    jest.clearAllMocks();
  });

  test("should underline on each subpage", () => {
    const urls = ["https://localhost"];
    
    // Test for a main page
    mockLocation("localhost", "https:", "/");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    
    // Test for a /news page
    mockLocation("localhost", "https:", "/news");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    
    // Test for a /contact-us page
    mockLocation("localhost", "https:", "/contact-us");
    expect(isBtnActive(urls, urls[0])).toBe(true);
  });

  test("should underline on each page except certain subpage", () => {
    const urls = ["https://localhost", "https://localhost/contact-us"];
    
    // Test for a main page
    mockLocation("localhost", "https:", "/");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    expect(isBtnActive(urls, urls[1])).toBe(false);
    
    // Test for a /news page
    mockLocation("localhost", "https:", "/news");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    expect(isBtnActive(urls, urls[1])).toBe(false);
    
    // Test for a /contact-us page
    mockLocation("localhost", "https:", "/contact-us");
    expect(isBtnActive(urls, urls[0])).toBe(false);
    expect(isBtnActive(urls, urls[1])).toBe(true);
  });
});