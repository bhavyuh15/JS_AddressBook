class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateMinLength(address, 4, "Address");
        this.city = this.validateMinLength(city, 4, "City");
        this.state = this.validateMinLength(state, 4, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    validateMinLength(value, minLength, fieldName) {
        if (value.length < minLength) {
            throw new Error(`${fieldName} must be at least ${minLength} characters long.`);
        }
        return value;
    }

    validateZip(zip) {
        const zipRegex = /^[0-9]{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Zip code must be exactly 6 digits.");
        }
        return zip;
    }

    validatePhone(phone) {
        const phoneRegex = /^(\+91\s?)?[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone number must be in the format +91 9876543210 or 9876543210.");
        }
        return phone;
    }

    validateEmail(email) {
        const emailRegex = /^abc([._+-][a-zA-Z0-9]+)?@bridgelabz\.co(\.in)?$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email must follow the pattern abc@bridgelabz.co or abc@bridgelabz.co.in.");
        }
        return email;
    }
}

// Test Cases
try {
    const contact1 = new Contact(
        "John", "Doe", "123 Main St", "Mumbai", "Maharashtra",
        "400001", "+91 9876543210", "abc@bridgelabz.co"
    );
    console.log("Valid Contact:", contact1);
} catch (error) {
    console.error(error.message);
}

try {
    const contact2 = new Contact(
        "john", "doe", "123", "NY", "CA",
        "12345", "1234567890", "wrong@xyz.com"
    );
    console.log("Valid Contact:", contact2);
} catch (error) {
    console.error("Error:", error.message);
}
