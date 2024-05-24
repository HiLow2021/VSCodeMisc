class AppSettings {
  final String name;
  final String email;
  final String password;

  AppSettings(this.name, this.email, this.password);

  AppSettings.fromJson(Map<String, dynamic> json)
      : name = json['name'] as String,
        email = json['email'] as String,
        password = json['password'] as String;

  Map<String, dynamic> toJson() => {
        'name': name,
        'email': email,
        'password': password,
      };
}
