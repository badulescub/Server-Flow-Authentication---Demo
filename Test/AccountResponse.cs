namespace Test
{
    public class AccountResponse
    {
        public bool Success { get; set; }
        public AccountUser User { get; set; }
    }

    public class AccountUser {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}