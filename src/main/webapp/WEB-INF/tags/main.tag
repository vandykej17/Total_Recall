<%@tag description="Main Page template" pageEncoding="UTF-8" %>
<%@attribute name="head" fragment="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
	<head>
		<script>
			var contextPath = '${pageContext.request.contextPath}';
		</script>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<META CONTENT="text/html; charset=UTF-8" HTTP-EQUIV="Content-Type"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<jsp:invoke fragment="head"/>
	</head>
	<body>
		<jsp:doBody/>
	</body>
</html>
