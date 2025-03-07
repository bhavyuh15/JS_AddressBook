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
        if (!/^[A-Z][a-zA-Z]{2,}$/.test(name)) {
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
        if (!/^\d{6}$/.test(zip)) {
            throw new Error("Zip code must be exactly 6 digits.");
        }
        return zip;
    }

    validatePhone(phone) {
        if (!/^(\+91\s?)?[6-9]\d{9}$/.test(phone)) {
            throw new Error("Phone number must be in the format +91 9876543210 or 9876543210.");
        }
        return phone;
    }

    validateEmail(email) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new Error("Invalid email format.");
        }
        return email;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    toString() {
        return `${this.getFullName()} - ${this.city}, ${this.state} | Phone: ${this.phone} | Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        let duplicate = this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
        if (duplicate) {
            console.log(` Error: Contact ${contact.getFullName()} already exists.`);
            return;
        }
        this.contacts.push(contact);
        console.log(` Contact ${contact.getFullName()} added successfully!`);
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log(" Address book is empty.");
            return;
        }
        console.log("\n Address Book Contacts:");
        this.contacts.forEach(contact => console.log(contact.toString()));
    }

    sortContactsByName() {
        this.contacts.sort((a, b) => a.getFullName().localeCompare(b.getFullName()));
        console.log("\n Sorted Contacts by Name:");
        this.displayContacts();
    }

    deleteContact(firstName, lastName) {
        let index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log(` Contact ${firstName} ${lastName} deleted successfully.`);
        } else {
            console.log(` Contact ${firstName} ${lastName} not found.`);
        }
    }

    searchByCity(city) {
        let cityContacts = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
        console.log(`\n Contacts in ${city}:`);
        cityContacts.length ? cityContacts.forEach(contact => console.log(contact.toString())) : console.log("No contacts found.");
    }

    searchByState(state) {
        let stateContacts = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());
        console.log(`\n Contacts in ${state}:`);
        stateContacts.length ? stateContacts.forEach(contact => console.log(contact.toString())) : console.log("No contacts found.");
    }

    countByCity(city) {
        let count = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase()).length;
        console.log(`Total contacts in ${city}: ${count}`);
    }

    countByState(state) {
        let count = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase()).length;
        console.log(`Total contacts in ${state}: ${count}`);
    }

    countContacts() {
        return this.contacts.length;
    }
}

// Example Usage
try {
    let myAddressBook = new AddressBook();

    myAddressBook.addContact(new Contact("John", "Doe", "123 Main St", "Mumbai", "Maharashtra", "400001", "+91 9876543210", "john.doe@example.com"));
    myAddressBook.addContact(new Contact("Alice", "Smith", "456 Elm St", "Pune", "Maharashtra", "411002", "9876543210", "alice.smith@example.com"));
    myAddressBook.addContact(new Contact("Bob", "Johnson", "789 Oak St", "Delhi", "Delhi", "110001", "+91 8765432109", "bob.johnson@example.com"));

    myAddressBook.displayContacts();
    
    myAddressBook.sortContactsByName();

    myAddressBook.searchByCity("Mumbai");
    myAddressBook.searchByState("Maharashtra");

    myAddressBook.countByCity("Pune");
    myAddressBook.countByState("Delhi");

    console.log(`Total contacts: ${myAddressBook.countContacts()}`);

    myAddressBook.deleteContact("Alice", "Smith");
    myAddressBook.displayContacts();
} catch (error) {
    console.error("Error:", error.message);
}
