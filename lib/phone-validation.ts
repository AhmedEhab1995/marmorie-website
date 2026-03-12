// Egyptian Phone Number Validation
// Supports mobile and landline numbers in various formats

export type PhoneValidationResult = {
  isValid: boolean
  formatted: string
  error?: string
}

/**
 * Validates Egyptian phone numbers
 * 
 * Supported formats:
 * - 1XXXXXXXXX (10 digits starting with 1)
 * - 01XXXXXXXXX (11 digits starting with 01)
 * - 201XXXXXXXXX (12 digits starting with 201)
 * - +201XXXXXXXXX (13 digits starting with +201)
 */
export function validateEgyptianPhone(phone: string): PhoneValidationResult {
  // Remove all spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '')

  // Empty check
  if (!cleaned) {
    return {
      isValid: false,
      formatted: '',
      error: 'Phone number is required'
    }
  }

  // Pattern 1: 10 digits starting with 1 (1XXXXXXXXX)
  if (/^1[0-2,5][0-9]{8}$/.test(cleaned)) {
    return {
      isValid: true,
      formatted: `0${cleaned}` // Add 0 prefix for display
    }
  }

  // Pattern 2: 11 digits starting with 01 (01XXXXXXXXX)
  if (/^01[0-2,5][0-9]{8}$/.test(cleaned)) {
    return {
      isValid: true,
      formatted: cleaned
    }
  }

  // Pattern 3: 12 digits starting with 201 (201XXXXXXXXX)
  if (/^201[0-2,5][0-9]{8}$/.test(cleaned)) {
    return {
      isValid: true,
      formatted: `+${cleaned}` // Add + for display
    }
  }

  // Pattern 4: 13 digits starting with +201 (+201XXXXXXXXX)
  if (/^\+201[0-2,5][0-9]{8}$/.test(cleaned)) {
    return {
      isValid: true,
      formatted: cleaned
    }
  }

  // Invalid - return appropriate error
  return {
    isValid: false,
    formatted: cleaned,
    error: getErrorMessage(cleaned)
  }
}

function getErrorMessage(phone: string): string {
  const len = phone.length

  if (len < 10) {
    return 'Phone number is too short'
  }

  if (len > 13) {
    return 'Phone number is too long'
  }

  // Check specific patterns
  if (len === 10 && !phone.match(/^1[0-2,5]/)) {
    return 'Mobile numbers must start with 10, 11, 12, or 15'
  }

  if (len === 11 && !phone.match(/^01[0-2,5]/)) {
    return 'Mobile numbers must start with 010, 011, 012, or 015'
  }

  if (len === 12 && !phone.match(/^201[0-2,5]/)) {
    return 'Mobile numbers must start with 201 followed by 0, 1, 2, or 5'
  }

  if (len === 13 && !phone.match(/^\+201[0-2,5]/)) {
    return 'Mobile numbers must start with +201 followed by 0, 1, 2, or 5'
  }

  return 'Invalid Egyptian phone number format. Only Egyptian numbers are accepted.'
}

/**
 * Format phone number as user types (for input display)
 */
export function formatPhoneInput(value: string): string {
  // Remove all non-digit characters except + at the start
  let cleaned = value.replace(/[^\d+]/g, '')
  
  // Ensure + only appears at the start
  if (cleaned.includes('+')) {
    cleaned = '+' + cleaned.replace(/\+/g, '')
  }

  return cleaned
}

/**
 * Quick validation check (returns boolean)
 */
export function isValidEgyptianPhone(phone: string): boolean {
  return validateEgyptianPhone(phone).isValid
}