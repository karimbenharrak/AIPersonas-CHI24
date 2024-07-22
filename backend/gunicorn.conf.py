"""Gunicorn configuration module.

This module defines some configuration parameters. This file is
automatically read by gunicorn.
"""

import multiprocessing

bind = "0.0.0.0:5000"
workers = 4
timeout = 0
