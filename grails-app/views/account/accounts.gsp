<html>
<head>
    <title>Sign Up</title>
</head>

<body>
<a href="/">Go Back</a>
<form action="/account/createUsers" method="post">
    <div>
        username: <input type="text" name="userName" value="user" onfocus="this.value=''" />
    </div>
    <div>
        password: <input type="password" name="password" value="password" onfocus="this.value=''" />
    </div>
    <input type="submit" value="Sign Up"/>
</form>

</body>
</html>
