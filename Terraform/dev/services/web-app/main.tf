provider "aws" {
  region = "${var.region}"
}

resource "aws_security_group" "instance_sg" {
    name = "${var.tag_name}-secgroup"

    ingress {
        from_port = "${var.server_port}"
        to_port = "${var.server_port}"
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = "${var.server_port_api}"
        to_port = "${var.server_port_api}"
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_instance" "instance" {
    ami = "ami-0552e3455b9bc8d50"
    instance_type = "t2.micro"
    vpc_security_group_ids = ["${aws_security_group.instance_sg.id}"]
    key_name = "${var.publicKeyName}"

    tags {
      Name = "${var.tag_name}"
      Owner = "${var.tag_owner}"
      CreatedBy = "${var.tag_createdby}"
      Purpose = "${var.tag_purpose}"
    }

    lifecycle {
        create_before_destroy = true
    }
}

terraform {
  backend "s3" {
    bucket = "tfzbucket"
    key    = "dev/services/web-app/terraform.tfstate"
    region = "us-east-2"
  }
}