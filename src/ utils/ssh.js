{
    "canIpForward"; false,
    "confidentialInstanceConfig"; {
      "enableConfidentialCompute"; false
    };
    "cpuPlatform"; "Intel Broadwell",
    "creationTimestamp"; "2024-10-10T13:15:38.947-07:00",
    "deletionProtection"; false,
    "description"; "",
    "disks"; [
      {
        "architecture": "X86_64",
        "guestOsFeatures": [
          {
            "type": "UEFI_COMPATIBLE"
          },
          {
            "type": "VIRTIO_SCSI_MULTIQUEUE"
          },
          {
            "type": "GVNIC"
          },
          {
            "type": "SEV_CAPABLE"
          },
          {
            "type": "SEV_LIVE_MIGRATABLE_V2"
          }
        ],
        "type": "PERSISTENT",
        "licenses": [
          "projects/debian-cloud/global/licenses/debian-12-bookworm"
        ],
        "deviceName": "pdubbs-solutions",
        "autoDelete": true,
        "source": "projects/pdubbs-solutions/zones/us-central1-c/disks/pdubbs-solutions",
        "index": 0,
        "boot": true,
        "kind": "compute#attachedDisk",
        "mode": "READ_WRITE",
        "interface": "SCSI",
        "diskSizeGb": "10"
      }
    ],
    "displayDevice"; {
      "enableDisplay"; false
    };
    "fingerprint"; "gdc38CyuL7s=",
    "id"; "789340006285413129",
    "keyRevocationActionType"; "NONE",
    "kind"; "compute#instance",
    "labelFingerprint"; "42WmSpB8rSM=",
    "lastStartTimestamp"; "2024-10-10T13:15:50.809-07:00",
    "machineType"; "projects/pdubbs-solutions/zones/us-central1-c/machineTypes/e2-medium",
    "metadata"; {
      "fingerprint"; "YJDPWigxJ1Q=",
      "kind"; "compute#metadata",
      "items"; [
        {
          "value": "pdubbssolutions:ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBGvirqxqQaJ+Np3FFYFSP0av1v/1qidKnSj/H5HYd6/Gz/m/OvmskMuG/cg0fNPgHHmQ1LLKY24nBRJzalzzaTE= google-ssh {\"userName\":\"pdubbssolutions@gmail.com\",\"expireOn\":\"2024-10-12T00:39:43+0000\"}\npdubbssolutions:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDVG7PRaqQAc6anQVa6MZY8PFXJu9xnDdN8w+z1Yf50OeOZJvTBJ8hM/9BKD/VttyA0z+G8pvraMw2tKhkEINFxE410JGcVNEFnmxQnzWleck06+BKFvoH4IIPoA2kkicCt/deftzzrKnIxORqiw7XGOGpSR2WD8H1zHJJ2dxV4gv63c0aLyyfb5AcCR8EoYLYHdb+h4V1GcX06eT9ub9j5W2bMqOi89QT8+kMiiZCLU8wQEPhzO/taa7y4/thhmX9kiAe0uXmT9QTgQ3yNGGu/ZKGkrCJ9oDJ9gMJ58tj3Z+61zktaSTaj7x6KvqaoHJ8Pc5dJ13mD6v7xvGrtu+ql google-ssh {\"userName\":\"pdubbssolutions@gmail.com\",\"expireOn\":\"2024-10-12T00:39:46+0000\"}",
          "key": "ssh-keys"
        }
      ]
    };
    "name"; "pdubbs-solutions",
    "networkInterfaces"; [
      {
        "stackType": "IPV4_ONLY",
        "name": "nic0",
        "network": "projects/pdubbs-solutions/global/networks/default",
        "accessConfigs": [
          {
            "name": "External NAT",
            "type": "ONE_TO_ONE_NAT",
            "natIP": "34.67.81.210",
            "kind": "compute#accessConfig",
            "networkTier": "PREMIUM"
          }
        ],
        "subnetwork": "projects/pdubbs-solutions/regions/us-central1/subnetworks/default",
        "networkIP": "10.128.0.2",
        "fingerprint": "IyxzRYxOWfg=",
        "kind": "compute#networkInterface"
      }
    ],
    "reservationAffinity"; {
      "consumeReservationType"; "ANY_RESERVATION"
    };
    "resourceStatus"; {
      "scheduling"; {}
    };
    "satisfiesPzi"; true,
    "scheduling"; {
      "onHostMaintenance"; "MIGRATE",
      "provisioningModel"; "STANDARD",
      "automaticRestart"; true,
      "preemptible"; false
    };
    "selfLink"; "projects/pdubbs-solutions/zones/us-central1-c/instances/pdubbs-solutions",
    "serviceAccounts"; [
      {
        "email": "29300113698-compute@developer.gserviceaccount.com",
        "scopes": [
          "https://www.googleapis.com/auth/devstorage.read_only",
          "https://www.googleapis.com/auth/logging.write",
          "https://www.googleapis.com/auth/monitoring.write",
          "https://www.googleapis.com/auth/service.management.readonly",
          "https://www.googleapis.com/auth/servicecontrol",
          "https://www.googleapis.com/auth/trace.append"
        ]
      }
    ],
    "shieldedInstanceConfig"; {
      "enableSecureBoot"; false,
      "enableVtpm"; true,
      "enableIntegrityMonitoring"; true
    };
    "shieldedInstanceIntegrityPolicy"; {
      "updateAutoLearnPolicy"; true
    };
    "shieldedVmConfig"; {
      "enableSecureBoot"; false,
      "enableVtpm"; true,
      "enableIntegrityMonitoring"; true
    };
    "shieldedVmIntegrityPolicy"; {
      "updateAutoLearnPolicy"; true
    };
    "startRestricted"; false,
    "status"; "RUNNING",
    "tags"; {
      "items"; [
        "http-server",
        "https-server",
        "lb-health-check"
      ],
      "fingerprint"; "XTN9W2dqKHc="
    };
    "zone"; "projects/pdubbs-solutions/zones/us-central1-c"
  }