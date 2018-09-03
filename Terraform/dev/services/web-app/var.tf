variable "region" {
  description = "Region to Deploy TFZ"
  default = "us-east-2"
}

variable "publicKeyName" {
  description = "Key Pair Name"
  default = "ec2ansibleplaybook"
}

variable "server_port" {
  description = "Port to listen the app"
  default = 3000
}

variable "server_port_api" {
  description = "Port to listen the api"
  default = 5000
}

variable "tag_name" {
  description = "EC2 Instance Name"
  default = "technologyfighterz"
}

variable "tag_owner" {
  description = "Owner Tag to EC2 Instance"
  default = "Tech Office"
}

variable "tag_createdby" {
  description = "CreatedBy Tag to EC2 Instance"
  default = "Tomas Granda tomasg"
}

variable "tag_purpose" {
  description = "Purpose Tag to EC2 Instance"
  default = "Deploy Technology Fighter Z"
}