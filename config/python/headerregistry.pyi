import types
from collections.abc import Iterable, Mapping
from datetime import datetime as _datetime
from email._header_value_parser import (
    AddressList,
    ContentDisposition,
    ContentTransferEncoding,
    ContentType,
    MessageID,
    MIMEVersion,
    TokenList,
    UnstructuredTokenList,
)
from email.errors import MessageDefect
from email.policy import Policy
from typing import Any, ClassVar, Literal, Protocol
from typing_extensions import Self

class BaseHeader(str):
    # max_count is actually more of an abstract ClassVar (not defined on the base class, but expected to be defined in subclasses)
    max_count: ClassVar[Literal[1] | None]
    @property
    def name(self) -> str: ...
    @property
    def defects(self) -> tuple[MessageDefect, ...]: ...
    def __new__(cls, name: str, value: Any) -> Self: ...
    def init(self, name: str, *, parse_tree: TokenList, defects: Iterable[MessageDefect]) -> None: ...
    def fold(self, *, policy: Policy) -> str: ...

class UnstructuredHeader:
    max_count: ClassVar[Literal[1] | None]
    @staticmethod
    def value_parser(value: str) -> UnstructuredTokenList: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...

class UniqueUnstructuredHeader(UnstructuredHeader):
    max_count: ClassVar[Literal[1]]

class DateHeader:
    max_count: ClassVar[Literal[1] | None]
    def init(self, name: str, *, parse_tree: TokenList, defects: Iterable[MessageDefect], datetime: _datetime) -> None: ...
    @property
    def datetime(self) -> _datetime: ...
    @staticmethod
    def value_parser(value: str) -> UnstructuredTokenList: ...
    @classmethod
    def parse(cls, value: str | _datetime, kwds: dict[str, Any]) -> None: ...

class UniqueDateHeader(DateHeader):
    max_count: ClassVar[Literal[1]]

class AddressHeader:
    max_count: ClassVar[Literal[1] | None]
    def init(self, name: str, *, parse_tree: TokenList, defects: Iterable[MessageDefect], groups: Iterable[Group]) -> None: ...
    @property
    def groups(self) -> tuple[Group, ...]: ...
    @property
    def addresses(self) -> tuple[Address, ...]: ...
    @staticmethod
    def value_parser(value: str) -> AddressList: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...

class UniqueAddressHeader(AddressHeader):
    max_count: ClassVar[Literal[1]]

class SingleAddressHeader(AddressHeader):
    @property
    def address(self) -> Address: ...

class UniqueSingleAddressHeader(SingleAddressHeader):
    max_count: ClassVar[Literal[1]]

class MIMEVersionHeader:
    max_count: ClassVar[Literal[1]]
    def init(
        self,
        name: str,
        *,
        parse_tree: TokenList,
        defects: Iterable[MessageDefect],
        version: str | None,
        major: int | None,
        minor: int | None,
    ) -> None: ...
    @property
    def version(self) -> str | None: ...
    @property
    def major(self) -> int | None: ...
    @property
    def minor(self) -> int | None: ...
    @staticmethod
    def value_parser(value: str) -> MIMEVersion: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...

class ParameterizedMIMEHeader:
    max_count: ClassVar[Literal[1]]
    def init(self, name: str, *, parse_tree: TokenList, defects: Iterable[MessageDefect], params: Mapping[str, Any]) -> None: ...
    @property
    def params(self) -> types.MappingProxyType[str, Any]: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...

class ContentTypeHeader(ParameterizedMIMEHeader):
    @property
    def content_type(self) -> str: ...
    @property
    def maintype(self) -> str: ...
    @property
    def subtype(self) -> str: ...
    @staticmethod
    def value_parser(value: str) -> ContentType: ...

class ContentDispositionHeader(ParameterizedMIMEHeader):
    # init is redefined but has the same signature as parent class, so is omitted from the stub
    @property
    def content_disposition(self) -> str | None: ...
    @staticmethod
    def value_parser(value: str) -> ContentDisposition: ...

class ContentTransferEncodingHeader:
    max_count: ClassVar[Literal[1]]
    def init(self, name: str, *, parse_tree: TokenList, defects: Iterable[MessageDefect]) -> None: ...
    @property
    def cte(self) -> str: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...
    @staticmethod
    def value_parser(value: str) -> ContentTransferEncoding: ...

class MessageIDHeader:
    max_count: ClassVar[Literal[1]]
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any]) -> None: ...
    @staticmethod
    def value_parser(value: str) -> MessageID: ...

class _HeaderParser(Protocol):
    max_count: ClassVar[Literal[1] | None]
    @staticmethod
    def value_parser(value: str, /) -> TokenList: ...
    @classmethod
    def parse(cls, value: str, kwds: dict[str, Any], /) -> None: ...

class HeaderRegistry:
    registry: dict[str, type[_HeaderParser]]
    base_class: type[BaseHeader]
    default_class: type[_HeaderParser]
    def __init__(
        self, base_class: type[BaseHeader] = ..., default_class: type[_HeaderParser] = ..., use_default_map: bool = True
    ) -> None: ...
    def map_to_type(self, name: str, cls: type[BaseHeader]) -> None: ...
    def __getitem__(self, name: str) -> type[BaseHeader]: ...
    def __call__(self, name: str, value: Any) -> BaseHeader: ...

class Address:
    @property
    def display_name(self) -> str: ...
    @property
    def username(self) -> str: ...
    @property
    def domain(self) -> str: ...
    @property
    def addr_spec(self) -> str: ...
    def __init__(
        self, display_name: str = "", username: str | None = "", domain: str | None = "", addr_spec: str | None = None
    ) -> None: ...
    def __eq__(self, other: object) -> bool: ...

class Group:
    @property
    def display_name(self) -> str | None: ...
    @property
    def addresses(self) -> tuple[Address, ...]: ...
    def __init__(self, display_name: str | None = None, addresses: Iterable[Address] | None = None) -> None: ...
    def __eq__(self, other: object) -> bool: ...

from _heapq import *
from _typeshed import SupportsRichComparison
from collections.abc import Callable, Iterable
from typing import Any, Final, TypeVar

__all__ = ["heappush", "heappop", "heapify", "heapreplace", "merge", "nlargest", "nsmallest", "heappushpop"]

_S = TypeVar("_S")

__about__: Final[str]

def merge(
    *iterables: Iterable[_S], key: Callable[[_S], SupportsRichComparison] | None = None, reverse: bool = False
) -> Iterable[_S]: ...
def nlargest(n: int, iterable: Iterable[_S], key: Callable[[_S], SupportsRichComparison] | None = None) -> list[_S]: ...
def nsmallest(n: int, iterable: Iterable[_S], key: Callable[[_S], SupportsRichComparison] | None = None) -> list[_S]: ...
def _heapify_max(heap: list[Any], /) -> None: ...  # undocumented
