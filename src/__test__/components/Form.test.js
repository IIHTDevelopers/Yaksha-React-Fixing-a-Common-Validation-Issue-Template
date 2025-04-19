import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../../components/Form';

describe('boundary', () => {
    beforeAll(() => {
        // Mock window.alert
        window.alert = jest.fn();
    });

    afterEach(() => {
        // Clear all mocks after each test
        jest.clearAllMocks();
    });

    test('FormComponent boundary checks if the "Name" label is present', () => {
        render(<Form />);

        // Check if the "Name" label is in the document
        const nameLabel = screen.getByTestId('name-label');
        expect(nameLabel).toBeInTheDocument();
        expect(nameLabel).toHaveTextContent('Name');
    });

    test('FormComponent boundary checks if the "Email" label is present', () => {
        render(<Form />);

        // Check if the "Email" label is in the document
        const emailLabel = screen.getByTestId('email-label');
        expect(emailLabel).toBeInTheDocument();
        expect(emailLabel).toHaveTextContent('Email');
    });

    test('FormComponent boundary checks if the "Password" label is present', () => {
        render(<Form />);

        // Check if the "Password" label is in the document
        const passwordLabel = screen.getByTestId('password-label');
        expect(passwordLabel).toBeInTheDocument();
        expect(passwordLabel).toHaveTextContent('Password');
    });

    test('FormComponent boundary checks if the "Name" input field (type="text") is present', () => {
        render(<Form />);

        // Check if the input field with type="text" for "Name" is in the document
        const nameInput = screen.getByTestId('name-input');
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute('type', 'text');
    });

    test('FormComponent boundary checks if the "Name" input field (type="text") is present', () => {
        render(<Form />);

        // Check if the input field with type="text" for "Name" is in the document
        const nameInput = screen.getByTestId('name-input');
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute('type', 'text');
    });

    test('FormComponent boundary checks if the "Email" input field (type="email") is present', () => {
        render(<Form />);

        // Check if the input field with type="email" for "Email" is in the document
        const emailInput = screen.getByTestId('email-input');
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('FormComponent boundary checks if the "Password" input field (type="password") is present', () => {
        render(<Form />);

        // Check if the input field with type="password" for "Password" is in the document
        const passwordInput = screen.getByTestId('password-input');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('FormComponent boundary checks if the submit button is disabled when the form is invalid', () => {
        render(<Form />);
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toBeDisabled();
    });

    test('FormComponent boundary checks if the submit button is enabled when the form is valid', () => {
        render(<Form />);
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(submitButton).not.toBeDisabled();
    });

    test('FormComponent boundary checks if the name error message is shown when name input is empty', () => {
        render(<Form />);
        const submitButton = screen.getByTestId('submit-button');
        fireEvent.click(submitButton);
        const nameError = screen.getByTestId('name-error');
        expect(nameError).toBeInTheDocument();
        expect(nameError).toHaveTextContent('Name is required');
    });

    test('FormComponent boundary checks if the email error message is shown when email input is invalid', () => {
        render(<Form />);
        const emailInput = screen.getByTestId('email-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        const emailError = screen.getByTestId('email-error');
        expect(emailError).toBeInTheDocument();
        expect(emailError).toHaveTextContent('Please enter a valid email address');
    });

    test('FormComponent boundary checks if the password error message is shown when password is less than 6 characters', () => {
        render(<Form />);
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(passwordInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        const passwordError = screen.getByTestId('password-error');
        expect(passwordError).toBeInTheDocument();
        expect(passwordError).toHaveTextContent('Password must be at least 6 characters');
    });

    test('FormComponent boundary checks if the form title is present and correct', () => {
        render(<Form />);
        const formTitle = screen.getByTestId('form-title');
        expect(formTitle).toBeInTheDocument();
        expect(formTitle).toHaveTextContent('Sign Up');
    });

    test('FormComponent boundary checks if the form submits successfully with valid data', () => {
        render(<Form />);
        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByTestId('submit-button');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(window.alert).toHaveBeenCalledWith('Form submitted successfully');
    });
});