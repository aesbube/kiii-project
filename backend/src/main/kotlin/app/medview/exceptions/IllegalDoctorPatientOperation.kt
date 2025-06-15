package app.medview.exceptions

class IllegalDoctorPatientOperation (doctorId: Long, patientId:Long)
    : RuntimeException ("Doctor $doctorId is not GP of patient $patientId")