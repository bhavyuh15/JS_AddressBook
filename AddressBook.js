class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        console.log(" Contact added successfully!");
    }

    displayContacts() {
        console.log("\n Address Book:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.firstName} ${contact.lastName}, ${contact.address}, ${contact.city}, ${contact.state} - ${contact.zip},  ${contact.phoneNumber},  ${contact.email}`);
        });
    }
}


const myAddressBook = new AddressBook();

const contact1 = new Contact("John", "Doe", "123 Main St", "New York", "NY", "10001", "123-456-7890", "john.doe@example.com");
myAddressBook.addContact(contact1);

const contact2 = new Contact("Jane", "Smith", "456 Elm St", "Los Angeles", "CA", "90001", "987-654-3210", "jane.smith@example.com");
myAddressBook.addContact(contact2);

myAddressBook.displayContacts();
