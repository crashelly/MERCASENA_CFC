<?php

if (Auth::checkAdminPrvileges()) {

} else {
    Auth::insuficientPrivileges();
}
?>