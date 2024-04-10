const xml2js = require('xml2js');
const xmlString = `PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c2FtbDJwOlJlc3BvbnNlIERlc3RpbmF0aW9uPSJodHRwOi8vbG9jYWxob3N0OjUwMDAvbG9naW4iIElEPSJpZDM1ODY2NjM0MTczMzEwNjIxMjc3NjUzNzkzIiBJc3N1ZUluc3RhbnQ9IjIwMjQtMDMtMDZUMDc6MjA6NTUuNDE0WiIgVmVyc2lvbj0iMi4wIiB4bWxuczpzYW1sMnA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCI+PHNhbWwyOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPmh0dHA6Ly93d3cub2t0YS5jb20vZXhrYmc3N280dHpxdVJNRXc2OTc8L3NhbWwyOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj48ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjxkczpTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Ii8+PGRzOlJlZmVyZW5jZSBVUkk9IiNpZDM1ODY2NjM0MTczMzEwNjIxMjc3NjUzNzkzIj48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGVuYyNzaGEyNTYiLz48ZHM6RGlnZXN0VmFsdWU+V1dYTVJMUEFYRU01NUlpY2VHRnJIQVlxQnRlMkRDNGlZM1BxQXJoZlhqMD08L2RzOkRpZ2VzdFZhbHVlPjwvZHM6UmVmZXJlbmNlPjwvZHM6U2lnbmVkSW5mbz48ZHM6U2lnbmF0dXJlVmFsdWU+QTNlUXZJZWxCRjRZdHd1S21EeTMrRVR0WWttN1dFY0ltWXJlWm0zWHVWTGZwNzdSV3VFdThNcWVkZHc5aHdEUFVVS1huQktFNklqQlRSaHBhWG5sRFR4MmZxaCtxWGxXSkRDM1Ywa3JqaGgwSEFlQTBJdlIvLzl6QmNNT2h4TVl2KzNQL054d0N0MHhLR1BzR3FZOFJoT09uUEk3aXpWdHYzVnJ6Z2c5NmlCKy9LaGNTTWVQdkJRWW1SdW91Z1ZZbnpoZFdHalN3ZmN5WEZhSHZocHcrV2llMGJmekRHWlBVWDM0cHhtSWVWb0sxZkI4RG5zQlp3Vmx0VnQyckZsRkVWZlJwZTZiS3kvN0gzRVlFYzJkZk5xUWVuaXRtZjIvcGk5K0N1NVVUNnlSV0wxcDZoWG1vdmxibFR4c0lEenBLdmlYUmZhNGx4VVVBaDdqSmFEQjFnPT08L2RzOlNpZ25hdHVyZVZhbHVlPjxkczpLZXlJbmZvPjxkczpYNTA5RGF0YT48ZHM6WDUwOUNlcnRpZmljYXRlPk1JSURxakNDQXBLZ0F3SUJBZ0lHQVkybVIwMzlNQTBHQ1NxR1NJYjNEUUVCQ3dVQU1JR1ZNUXN3Q1FZRFZRUUdFd0pWVXpFVE1CRUcKQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVXTUJRR0ExVUVCd3dOVTJGdUlFWnlZVzVqYVhOamJ6RU5NQXNHQTFVRUNnd0VUMnQwWVRFVQpNQklHQTFVRUN3d0xVMU5QVUhKdmRtbGtaWEl4RmpBVUJnTlZCQU1NRFhSeWFXRnNMVFEzTlRFMk5UUXhIREFhQmdrcWhraUc5dzBCCkNRRVdEV2x1Wm05QWIydDBZUzVqYjIwd0hoY05NalF3TWpFME1EWXlNRFEzV2hjTk16UXdNakUwTURZeU1UUTNXakNCbFRFTE1Ba0cKQTFVRUJoTUNWVk14RXpBUkJnTlZCQWdNQ2tOaGJHbG1iM0p1YVdFeEZqQVVCZ05WQkFjTURWTmhiaUJHY21GdVkybHpZMjh4RFRBTApCZ05WQkFvTUJFOXJkR0V4RkRBU0JnTlZCQXNNQzFOVFQxQnliM1pwWkdWeU1SWXdGQVlEVlFRRERBMTBjbWxoYkMwME56VXhOalUwCk1Sd3dHZ1lKS29aSWh2Y05BUWtCRmcxcGJtWnZRRzlyZEdFdVkyOXRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUIKQ2dLQ0FRRUF4TmlVbnhpYnd1UkJtT01Ta3I0RVJYK0tBTWppV1ZabDhybEp3dXRDWTBpQWJpMGI4VHZDTUF0c0ZzdnFRbk9DRXBYSApZelo4KzAvcFEybDg5eDdjd0g0MTY3WDcxUzI0WSsxVmhJd202Y1dVZ0tlZlJrc3ZyODZVczlDcnMrc0xWV0ZNOElKcUY5eUx5L1F2CkMwQUNZWHZWWHE3OGRvRHZWalcwNlZJQk4wSUNnRU53akdYdWgvUk9oeHlsMzM5NzYwNmp1elhuYkZMZkJiQ3BIVHVtQzhZcDJTL24KOUN3Y25DTkVuNFM2RTVzVU9YbUpjMEo2R09pY2V1ZDlRYTFKaW5oemFNSFFKVC9td0ZaQTB6QkhQRjErWFVhNnJTNGk2RmxpRzk3bApDQk90VkVEcFRUcFFzeE9OOTE5WCthMUJ5UGl0R1NOZ3pWOUM5aEZIakxsUjd3SURBUUFCTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCCkFRQkQvNGZzNmdoQkx1M1diTmNKVWUyekc1WGhGNVJycTZ2aW1MWnhTRUNHU0U2WHdUT3ljNkhmQWFJbVZUVmdrajB0TlRNcjU3anAKSFdtdHNKMHBhTHkvbkxNdDlHUmhvK3NmaWtJdXZHMnpKcVhPaVl4UVVJdE0vMEgxMkkxWGxaYyt3cnRaK2JJT2JLTWx4V0FRK1NwZwpMcDdtZUlhMWJKa0FjR204WjVEM3BpK2VoNEVBOHUrV1llOEZWZ0paUkNzTlk5Z3VoYWkxTVJLSlBNVHhVdktYYWxUQVI4RlpNRWFICjNJK0FvbEduVFV6bFNMQm5aRm1RcjA0c3Y1RThQU294UTZ0SjlNZzMyejBWdFR2d3ZjQ01HeldsUjVNU3k0MVp2LzJsLzJkMmNkU1MKdFlEUTBmWWJLcWx1bStMelNlSlFrck1SQWEwYUFJbDNkRmh2RHVBYjwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMnA6U3RhdHVzIHhtbG5zOnNhbWwycD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj48c2FtbDJwOlN0YXR1c0NvZGUgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyIvPjwvc2FtbDJwOlN0YXR1cz48c2FtbDI6QXNzZXJ0aW9uIElEPSJpZDM1ODY2NjM0MTc1MjQwNjQxOTc2MDM2NDA5IiBJc3N1ZUluc3RhbnQ9IjIwMjQtMDMtMDZUMDc6MjA6NTUuNDE0WiIgVmVyc2lvbj0iMi4wIiB4bWxuczpzYW1sMj0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+PHNhbWwyOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPmh0dHA6Ly93d3cub2t0YS5jb20vZXhrYmc3N280dHpxdVJNRXc2OTc8L3NhbWwyOklzc3Vlcj48ZHM6U2lnbmF0dXJlIHhtbG5zOmRzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjIj48ZHM6U2lnbmVkSW5mbz48ZHM6Q2Fub25pY2FsaXphdGlvbk1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIvPjxkczpTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Ii8+PGRzOlJlZmVyZW5jZSBVUkk9IiNpZDM1ODY2NjM0MTc1MjQwNjQxOTc2MDM2NDA5Ij48ZHM6VHJhbnNmb3Jtcz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9kczpUcmFuc2Zvcm1zPjxkczpEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGVuYyNzaGEyNTYiLz48ZHM6RGlnZXN0VmFsdWU+OUhmN3owcGV4cG1ZYVU4aW9OZ2hWMDdWeldscEJQSnZncEFDU0FHNytXMD08L2RzOkRpZ2VzdFZhbHVlPjwvZHM6UmVmZXJlbmNlPjwvZHM6U2lnbmVkSW5mbz48ZHM6U2lnbmF0dXJlVmFsdWU+YUJzQkRyVE5TL1g0YWtIVXR1Q1JzNnRPUGhETWVFWGljSnJaZm8vSm00d0JBZlYwSTNvV1BybXltM1ZMTkxoZmdMMWJCR0d3bjF3YXYyVWN4RGl6UHpxZEdsK091WlRKOElVTHRiYUlmMHBrc2N4R2FPbm9leWFKcmgrVzBueTNuTjJwWjRtZi9nejVrUXFBUGlNSDBScjVkeFg2ZmlGNCswUnlFQStiWU5ieHkxRFF2cWhVdFdic3hRUmVIY0NPMzMrWS84eFZQRU9EZ0dUZnh1eWJKQkdCMGRCVzJmdExMT2VTNk40RC9GTjljdDg3czg3QmUvNCtXZ1RhZHhNSkQ2WW80U1Z3ZEVjMGtNZTRTTGFhZXJIWnA0dElwRWptWVlZZ3pNVnd2ZTk3TEJkNVJ1RUp1RGwvV1hsa1VzZ0tnQWpHY2lZSlZHR1VSSzI3ZW5hcVhnPT08L2RzOlNpZ25hdHVyZVZhbHVlPjxkczpLZXlJbmZvPjxkczpYNTA5RGF0YT48ZHM6WDUwOUNlcnRpZmljYXRlPk1JSURxakNDQXBLZ0F3SUJBZ0lHQVkybVIwMzlNQTBHQ1NxR1NJYjNEUUVCQ3dVQU1JR1ZNUXN3Q1FZRFZRUUdFd0pWVXpFVE1CRUcKQTFVRUNBd0tRMkZzYVdadmNtNXBZVEVXTUJRR0ExVUVCd3dOVTJGdUlFWnlZVzVqYVhOamJ6RU5NQXNHQTFVRUNnd0VUMnQwWVRFVQpNQklHQTFVRUN3d0xVMU5QVUhKdmRtbGtaWEl4RmpBVUJnTlZCQU1NRFhSeWFXRnNMVFEzTlRFMk5UUXhIREFhQmdrcWhraUc5dzBCCkNRRVdEV2x1Wm05QWIydDBZUzVqYjIwd0hoY05NalF3TWpFME1EWXlNRFEzV2hjTk16UXdNakUwTURZeU1UUTNXakNCbFRFTE1Ba0cKQTFVRUJoTUNWVk14RXpBUkJnTlZCQWdNQ2tOaGJHbG1iM0p1YVdFeEZqQVVCZ05WQkFjTURWTmhiaUJHY21GdVkybHpZMjh4RFRBTApCZ05WQkFvTUJFOXJkR0V4RkRBU0JnTlZCQXNNQzFOVFQxQnliM1pwWkdWeU1SWXdGQVlEVlFRRERBMTBjbWxoYkMwME56VXhOalUwCk1Sd3dHZ1lKS29aSWh2Y05BUWtCRmcxcGJtWnZRRzlyZEdFdVkyOXRNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUIKQ2dLQ0FRRUF4TmlVbnhpYnd1UkJtT01Ta3I0RVJYK0tBTWppV1ZabDhybEp3dXRDWTBpQWJpMGI4VHZDTUF0c0ZzdnFRbk9DRXBYSApZelo4KzAvcFEybDg5eDdjd0g0MTY3WDcxUzI0WSsxVmhJd202Y1dVZ0tlZlJrc3ZyODZVczlDcnMrc0xWV0ZNOElKcUY5eUx5L1F2CkMwQUNZWHZWWHE3OGRvRHZWalcwNlZJQk4wSUNnRU53akdYdWgvUk9oeHlsMzM5NzYwNmp1elhuYkZMZkJiQ3BIVHVtQzhZcDJTL24KOUN3Y25DTkVuNFM2RTVzVU9YbUpjMEo2R09pY2V1ZDlRYTFKaW5oemFNSFFKVC9td0ZaQTB6QkhQRjErWFVhNnJTNGk2RmxpRzk3bApDQk90VkVEcFRUcFFzeE9OOTE5WCthMUJ5UGl0R1NOZ3pWOUM5aEZIakxsUjd3SURBUUFCTUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCCkFRQkQvNGZzNmdoQkx1M1diTmNKVWUyekc1WGhGNVJycTZ2aW1MWnhTRUNHU0U2WHdUT3ljNkhmQWFJbVZUVmdrajB0TlRNcjU3anAKSFdtdHNKMHBhTHkvbkxNdDlHUmhvK3NmaWtJdXZHMnpKcVhPaVl4UVVJdE0vMEgxMkkxWGxaYyt3cnRaK2JJT2JLTWx4V0FRK1NwZwpMcDdtZUlhMWJKa0FjR204WjVEM3BpK2VoNEVBOHUrV1llOEZWZ0paUkNzTlk5Z3VoYWkxTVJLSlBNVHhVdktYYWxUQVI4RlpNRWFICjNJK0FvbEduVFV6bFNMQm5aRm1RcjA0c3Y1RThQU294UTZ0SjlNZzMyejBWdFR2d3ZjQ01HeldsUjVNU3k0MVp2LzJsLzJkMmNkU1MKdFlEUTBmWWJLcWx1bStMelNlSlFrck1SQWEwYUFJbDNkRmh2RHVBYjwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMjpTdWJqZWN0IHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj48c2FtbDI6TmFtZUlEIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6MS4xOm5hbWVpZC1mb3JtYXQ6dW5zcGVjaWZpZWQiPnNoaXZhbS4yMDkzMDIwMDVAbXVqLm1hbmlwYWwuZWR1PC9zYW1sMjpOYW1lSUQ+PHNhbWwyOlN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIj48c2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgTm90T25PckFmdGVyPSIyMDI0LTAzLTA2VDA3OjI1OjU1LjQxNFoiIFJlY2lwaWVudD0iaHR0cDovL2xvY2FsaG9zdDo1MDAwL2xvZ2luIi8+PC9zYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uPjwvc2FtbDI6U3ViamVjdD48c2FtbDI6Q29uZGl0aW9ucyBOb3RCZWZvcmU9IjIwMjQtMDMtMDZUMDc6MTU6NTUuNDE0WiIgTm90T25PckFmdGVyPSIyMDI0LTAzLTA2VDA3OjI1OjU1LjQxNFoiIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj48c2FtbDI6QXVkaWVuY2VSZXN0cmljdGlvbj48c2FtbDI6QXVkaWVuY2U+aHR0cDovL2xvY2FsaG9zdDo1MDAwL2xvZ2luPC9zYW1sMjpBdWRpZW5jZT48L3NhbWwyOkF1ZGllbmNlUmVzdHJpY3Rpb24+PC9zYW1sMjpDb25kaXRpb25zPjxzYW1sMjpBdXRoblN0YXRlbWVudCBBdXRobkluc3RhbnQ9IjIwMjQtMDMtMDZUMDc6MjA6NTQuNzk1WiIgU2Vzc2lvbkluZGV4PSJpZDE3MDk3MDk2MzQxNTEuNjc3OTA0OTk3IiB4bWxuczpzYW1sMj0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+PHNhbWwyOkF1dGhuQ29udGV4dD48c2FtbDI6QXV0aG5Db250ZXh0Q2xhc3NSZWY+dXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmRQcm90ZWN0ZWRUcmFuc3BvcnQ8L3NhbWwyOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDI6QXV0aG5Db250ZXh0Pjwvc2FtbDI6QXV0aG5TdGF0ZW1lbnQ+PC9zYW1sMjpBc3NlcnRpb24+PC9zYW1sMnA6UmVzcG9uc2U+`;

const decodedXmlString = Buffer.from(xmlString, 'base64').toString('utf-8');

xml2js.parseString(decodedXmlString, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});