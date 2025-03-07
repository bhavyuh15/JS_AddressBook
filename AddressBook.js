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

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        const duplicate = this.contacts.filter(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
        if (duplicate.length > 0) {
            console.log(`Error: Contact with name ${contact.firstName} ${contact.lastName} already exists.`);
            return;
        }
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("Address book is empty.");
            return;
        }
        console.log("\n📖 Address Book Contacts:");
        this.contacts.map((contact, index) =>
            console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - ${contact.city}, ${contact.state}`)
        );
    }

    countContacts() {
        const totalContacts = this.contacts.reduce(count => count + 1, 0);
        console.log(`Total number of contacts: ${totalContacts}`);
        return totalContacts;
    }

    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContact(firstName, lastName, updatedData) {
        const contact = this.findContact(firstName, lastName);
        if (contact) {
            Object.keys(updatedData).forEach(key => {
                if (contact[key] !== undefined) {
                    contact[key] = updatedData[key];
                }
            });
            console.log("Contact updated successfully!");
        } else {
            console.log(`Error: Contact ${firstName} ${lastName} not found.`);
        }
    }

    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log(`Contact ${firstName} ${lastName} deleted successfully!`);
        } else {
            console.log(`Error: Contact ${firstName} ${lastName} not found.`);
        }
    }

    searchByCity(city) {
        const contactsInCity = this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());

        if (contactsInCity.length === 0) {
            console.log(`No contacts found in ${city}.`);
            return;
        }

        console.log(`\n📍 Contacts in ${city}:`);
        contactsInCity.map(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.phone}, ${contact.email}`));

        const count = contactsInCity.reduce(count => count + 1, 0);
        console.log(`Total contacts in ${city}: ${count}`);
    }

    searchByState(state) {
        const contactsInState = this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase());

        if (contactsInState.length === 0) {
            console.log(`No contacts found in ${state}.`);
            return;
        }

        console.log(`\n🌍 Contacts in ${state}:`);
        contactsInState.map(contact => console.log(`${contact.firstName} ${contact.lastName} - ${contact.phone}, ${contact.email}`));

        const count = contactsInState.reduce(count => count + 1, 0);
        console.log(`Total contacts in ${state}: ${count}`);
    }

    viewByCity(city) {
        this.searchByCity(city);
    }

    viewByState(state) {
        this.searchByState(state);
    }
}

// Example Usage
const myAddressBook = new AddressBook();

try {
    myAddressBook.addContact(new Contact("John", "Doe", "123 Main St", "Mumbai", "Maharashtra", "400001", "+91 9876543210", "abc@bridgelabz.co"));
    myAddressBook.addContact(new Contact("Alice", "Smith", "456 Elm St", "Pune", "Maharashtra", "411002", "9876543210", "abc.xyz@bridgelabz.co.in"));
    myAddressBook.addContact(new Contact("Bob", "Johnson", "789 Oak St", "Delhi", "Delhi", "110001", "+91 8765432109", "abc.def@bridgelabz.co"));
} catch (error) {
    console.error("Error:", error.message);
}

// View persons by City
myAddressBook.viewByCity("Mumbai");

// View persons by State
myAddressBook.viewByState("Maharashtra");

// Display All Contacts
myAddressBook.displayContacts();

// Count Contacts
myAddressBook.countContacts();

// Edit Contact
myAddressBook.editContact("Alice", "Smith", { phone: "+91 9123456789", city: "Nagpur" });

// Delete Contact
myAddressBook.deleteContact("John", "Doe");

// Count Contacts Again
myAddressBook.countContacts();
