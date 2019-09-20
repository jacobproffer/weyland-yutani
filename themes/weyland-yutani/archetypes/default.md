---
title: "{{ replace .Name "-" " " | title }}"
description: "Post description"
category: ["news"]
date: {{ .Date }}
images:
  - /images/placeholder.png
draft: true
---